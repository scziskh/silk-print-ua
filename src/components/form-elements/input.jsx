'use client';

import { ConnectForm } from '@/lib/connect-form';

const Input = ({ name, config, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => (
        <>
          <input {...register(name, config)} {...rest} className="field" />
        </>
      )}
    </ConnectForm>
  );
};

export default Input;
