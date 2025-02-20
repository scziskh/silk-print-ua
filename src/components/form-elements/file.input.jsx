'use client';

import { ConnectForm } from '@/lib/connect-form';
import styled from 'styled-components';

const FileInput = ({ name, control, label, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => (
        <>
          <StyledInput {...register(name)} {...rest} type="file" id={name} />
          <StyledLabel htmlFor={name} className="field">
            {label}
          </StyledLabel>
        </>
      )}
    </ConnectForm>
  );
};

export default FileInput;

const StyledInput = styled.input`
  display: none;
  visibility: hidden;
`;

const StyledLabel = styled.label`
  display: block;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
`;
