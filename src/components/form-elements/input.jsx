'use client';

import { ConnectForm } from '@/lib/connect-form';
import styled from 'styled-components';

const Input = ({ name, config, ...rest }) => {
  return <ConnectForm>{({ register }) => <StyledInput {...register(name, config)} {...rest} className="field" />}</ConnectForm>;
};

export default Input;

const StyledInput = styled.input``;
