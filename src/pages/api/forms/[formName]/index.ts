/* eslint-disable import/no-anonymous-default-export */
import { withSentry } from '@sentry/nextjs';
import Cors from 'cors';
import type { NextApiResponse, NextApiHandler } from 'next';

import {
  validateSubmissionData,
  verifyRecaptcha,
  runMiddleware,
  useFormidable,
  submitFormDataToFormspree,
} from 'lib/api';
import type {
  IFormSubmission,
  DatoSingleAssetField,
  FormidableNextApiRequest,
} from 'lib/api/types';

type Request = IFormSubmission & {
  [key: string]: string | string[] | DatoSingleAssetField;
};

type Response = {
  message?: string;
  errors?: string[];
  token?: string;
};

// Disable default next body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: process.env.NEXT_CORS_ALLOWLIST ? process.env.NEXT_CORS_ALLOWLIST.split(', ') : '*',
});

const handler: NextApiHandler<Response> = async (
  req: FormidableNextApiRequest,
  res: NextApiResponse<Response>,
) => {
  await Promise.all([
    runMiddleware<Response>(req, res, cors),
    runMiddleware<Response>(req, res, useFormidable),
  ]);

  try {
    await runMiddleware<Response>(req, res, validateSubmissionData);
  } catch (err) {
    res.status(401);
    res.json({ errors: [err.message] });
  }

  try {
    await runMiddleware<Response>(req, res, verifyRecaptcha);
  } catch (err) {
    res.status(401);
    res.json({ errors: [err.message] });
  }

  const fields = { ...req.fields } as Request;

  try {
    if (process.env.NODE_ENV === 'production') {
      await submitFormDataToFormspree<Request>(fields);
    }
    res.status(200);
    res.json({ message: 'Success!' });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500);
    res.json({ errors: [err.message] });
  }
};

export default withSentry(handler);
