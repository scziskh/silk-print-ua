'use client';

import { ConnectForm } from '@/lib/connect-form';
import styled from 'styled-components';

const TextArea = ({ name, config, ...rest }) => {
  return <ConnectForm>{({ register }) => <StyledTextarea {...register(name, config)} {...rest} className="field" />}</ConnectForm>;
};

export default TextArea;

const StyledTextarea = styled.textarea`
  height: 320px;
  resize: vertical;
`;
