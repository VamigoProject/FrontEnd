import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useInput } from 'hooks';
import Router from 'next/router';
import styled, { keyframes } from 'styled-components';

const SearchBar = () => {
  const [width, setWidth] = useState<string>('7rem');
  const [search, onChangeSearch] = useInput<string>('');
  const [isHelperOpen, setIsHelperOpen] = useState<boolean>(false);

  const onFocus = () => {
    setIsHelperOpen(true);
    setWidth('12rem');
  };
  const onBlur = () => {
    setIsHelperOpen(false);
    if (search.length === 0) {
      setWidth('7rem');
    }
  };
  const onClickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onBlur();
    if (search === '' || !['@', '#'].includes(search.charAt(0))) {
      alert('검색어를 확인해주세요');
    }
    if (search.charAt(0) === '@') {
      Router.push({
        pathname: '/member/search',
        query: { nickname: search.slice(1) },
      });
    }
    if (search.charAt(0) === '#') {
      Router.push({
        pathname: '/work',
        query: { workName: search.slice(1) },
      });
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: '2.2rem',
        borderRadius: '1rem',
      }}
      onSubmit={(e: React.FormEvent) => onClickSearch(e)}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          width: { width },
          transition: 'width',
          transitionDuration: '0.5s',
          transitionTimingFunction: 'ease-in-out',
        }}
        value={search}
        onChange={onChangeSearch}
        placeholder="검색"
        onFocus={onFocus}
        onBlur={onBlur}
        inputProps={{
          maxLength: 20,
        }}
      />

      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
      {isHelperOpen && (
        <Helper>
          <strong>@</strong> : 유저 검색시
          <br />
          <strong>#</strong> : 작품 검색시
        </Helper>
      )}
    </Paper>
  );
};
const PopUp = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const Helper = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 10;
  transform: translate(-50%, 0);
  width: 10rem;
  height: 4rem;
  animation: ${PopUp} 0.75s ease-in-out;
  background-color: rgba(250, 250, 250, 0.95);
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 6px rgb(0, 0, 0, 0.1);
  padding: 0.5rem;
`;

export default SearchBar;
