import { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useInput from 'hooks/useInput';

const SearchBar = () => {
  const [width, setWidth] = useState<string>('7rem');
  const [search, onChangeSearch] = useInput('');

  const onFocus = () => {
    setWidth('12rem');
  };
  const onBlur = () => {
    if (search.length === 0) {
      setWidth('7rem');
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
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
