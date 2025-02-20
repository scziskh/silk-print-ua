'use client';

import { ConnectForm } from '@/lib/connect-form';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input';

const PhoneNumberInput = ({ name, control, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => (
        <Controller
          render={({ field }) => (
            <PhoneInput {...field} className="field" {...rest} maxLength={16} country="UA" international withCountryCallingCode={true} />
          )}
          {...register(name)}
          control={control}
        />
      )}
    </ConnectForm>
  );
};

export default PhoneNumberInput;
