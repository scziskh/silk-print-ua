'use client';

import { ConnectForm } from '@/lib/connect-form';
import styled from 'styled-components';

const FileInput = ({ name, control, label, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => (
        <>
          <Input {...register(name)} {...rest} type="file" id={name} />
          <Label htmlFor={name} className="field">
            {label}
          </Label>
        </>
      )}
    </ConnectForm>
  );
};

export default FileInput;

const Input = styled.input`
  display: none;
  visibility: hidden;
`;

const Label = styled.label`
  display: block;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
`;
