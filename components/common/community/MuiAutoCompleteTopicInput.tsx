import * as React from 'react';
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { TOPICS } from '../../../utils/constant/constants'
import { TopicType } from '../../../utils/types'
import { useEffect, useState } from 'react'
import TopCenterSnackBar from '../TopCenterSnackBar'

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 100%;
  outline: 1px solid #E5E7EB;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.375rem;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06));

  &:hover {
    border-color: #1C65D1;
  }

  &.focused {
    border-color: #1C65D1;
  }

  & input {
    background-color: white;
    color: #111827;
    box-sizing: border-box;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

interface Props {
  selectedTopics: TopicType[]
  setSelectedTopics: (selectedTopics: TopicType[]) => void
}

const getTopicList = () => TOPICS;

export default function MuiAutoCompleteTopicInput({ selectedTopics, setSelectedTopics }: Props) {
  const {
    getRootProps,
    // getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    // id: 'customized-hook-demo',
    // defaultValue: [getTopicList()[1]],
    multiple: true,
    options: getTopicList(),
    getOptionLabel: (option) => option.name,
  });
  const [isTopicNumError, setIsTopicNumError] = useState<boolean>(false)

  useEffect(() => {
    if (value.length > 5) {
      setIsTopicNumError(true)
    } else {
      setSelectedTopics(value)
    }
    console.log(value)
  }, [value])

  return (
    <div>
      {/* input 부분 */}
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {selectedTopics.map((option: TopicType, index: number) => (
            <StyledTag label={`#${ option.name }`} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {/* auto complete 부분 */}
      {groupedOptions.length > 0 && value.length < 5 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as TopicType[]).map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>#{option.name}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}

      {/* 6개 이상 선택할 수 없다는 알림 스낵바 TODO: 아예 막아둬서 사실 이 스낵바가 뜰 일이 없음 */}
      <TopCenterSnackBar
        isSnackBarOpen={isTopicNumError}
        setIsSnackBarOpen={setIsTopicNumError}
        severity='error'
        content='토픽은 6개 이상 선택할 수 없습니다!'
      />
    </div>
  );
}


// 태그 컴포넌트
interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
  margin-right: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
  background-color: #F5F6FF;
  border: 1px solid #E5E7EB;
  border-radius: 2px;
  border-radius: 0.5rem;
  box-sizing: content-box;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    margin-left: 0.375rem;
    color: #111827;
    font-size: 16px;
    cursor: pointer;
  }
`,
);