'use client';

import { ConnectForm } from '@/lib/connect-form';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input';

const PhoneNumberInput = ({ name, control, ...rest }) => {
  return (
    <ConnectForm>
      {({ control }) => (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <PhoneInput {...field} className="field" {...rest} maxLength={16} country="UA" international withCountryCallingCode />
          )}
        />
      )}
    </ConnectForm>
  );
};

export default PhoneNumberInput;
