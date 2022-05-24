import type { IFormSubmission } from 'lib/api/types';

const submitFormDataToFormspree = async <FormSubmission extends IFormSubmission>(
  data: FormSubmission,
): Promise<Response> => {
  return await fetch(process.env.NEXT_FORM_SUBMISSION_ENDPOINT, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
    }),
    body: JSON.stringify({ ...data }),
  });
};

export default submitFormDataToFormspree;
