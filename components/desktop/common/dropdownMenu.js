import styled from 'styled-components';
import React from "react";
import Router from 'next/router';

import c from "./commonStyle";

const DropdownMenuContainer = styled.div`
  position: fixed;
	background-color: #fff;
  border-radius: 10px;
  border: 0.5px solid #ccc;
  padding: 10px 0;
  opacity: 0.9;
  
  // height: 117px;

  
  // text-align: center;
  font-size: 16px;
  // font-weight: normal;
  // color: #000;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

const ListItem = styled.li`
  padding: 5px 47px;
  text-align: start;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;

  &:hover{
    background-color: #4FC0E8;
    cursor: pointer;
  }
`;

const ListImage = styled.img`
  // opacity: 1 !important;
`;

const ListButton = styled(c.Button)`

`;


const DropdownMenu = ({menuList, position, bgColor}) => {
  
  return (
    <DropdownMenuContainer style={{ top: position && position.top, left: position && position.left, background: bgColor && bgColor }}>
      <List>
        {menuList.map((menu, idx) => {
          return (
            // <ListItem key={idx} onClick={() => moveTo(menu.link, menu.state)}>
            <ListItem key={idx}>
              {menu.image ? <ListImage src={menu.image}/> : <></>}
              <a href={menu.link + '?state=' + menu.state}>{menu.name}</a>
            </ListItem>
          );
        })}
        
      </List>
    </DropdownMenuContainer>
  );
};

export default DropdownMenu;