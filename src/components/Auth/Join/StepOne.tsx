import React, { useMemo, useState } from 'react';
import * as A from '@/styles/auth.styles';

import { FormControl } from '@chakra-ui/react';
import { teamOptions, getJoinCompanyYear } from '@/utils';
import { useUserJoinStore } from '@/store/userJoinStore';
import { useRouter } from 'next/router';

function StepOne() {
  const router = useRouter();
  const { me, onSaveSignup } = useUserJoinStore();
  const joinCompanyYearOptions = useMemo(() => getJoinCompanyYear(), []);
  const [department, setDepartment] = useState('');
  const [joinCompanyYear, setJoinCompanyYear] = useState('');

  console.log(joinCompanyYear, department);
  console.log('me', me);

  const handleDepartmentChange = (selectedOption: unknown) => {
    setDepartment((selectedOption as { value: string }).value);
  };

  const handleJoinCompanyYearChange = (selectedOption: unknown) => {
    setJoinCompanyYear((selectedOption as { value: string }).value);
  };

  const isDisabled = useMemo(() => Boolean(!department || !joinCompanyYear), [department, joinCompanyYear]);

  const onClickNext = () => {
    onSaveSignup({ department, joinCompanyYear: +(joinCompanyYear as string) });
    router.push('/join/2');
  };

  return (
    <div>
      {/* 소속팀 선택 */}
      <A.InputContainer>
        <FormControl isRequired>
          <label>현재 소속 팀은 어디인가요?</label>
          <A.StyledSelect
            instanceId="team-select"
            aria-live="polite"
            name="teams"
            options={teamOptions}
            placeholder="팀 선택"
            closeMenuOnSelect={true}
            size="sm"
            onChange={handleDepartmentChange}
          />
        </FormControl>
      </A.InputContainer>
      {/* 입사연도 선택 */}
      <A.InputContainer>
        <FormControl isRequired>
          <label>입사 연도는 언제인가요?</label>
          <A.StyledSelect
            instanceId="join-year-select"
            aria-live="polite"
            name="join year"
            options={joinCompanyYearOptions}
            placeholder="입사 연도 선택"
            closeMenuOnSelect={true}
            size="sm"
            onChange={handleJoinCompanyYearChange}
          />
        </FormControl>
      </A.InputContainer>
      <A.ConfirmButton colorScheme="teal" size="md" isDisabled={isDisabled} onClick={onClickNext}>
        다음
      </A.ConfirmButton>
    </div>
  );
}

export default StepOne;
