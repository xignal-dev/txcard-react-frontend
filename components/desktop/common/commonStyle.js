// import { AlignJustify } from '@blueprintjs/icons/lib/esm/generated-icons/16px/paths';
import styled from 'styled-components';

class CommonStyle {

  static BigText = styled.div`	
    font-size: 52px;
    font-weight: bold;
    white-space: pre-line;
    line-height: 72px;
  `;

  static LargeText = styled.div`
    font-size: 32px;
    font-weight: bold;
    white-space: pre-line;
    line-height: 72px;
  `;

  static NormalText = styled.div`	
    font-size: 24px;
    font-weight: bold;
    white-space: pre-line;
    line-height: 32px;
  `;

  static SmallText = styled.div`	
    font-size: 20px;
    font-weight: 600;
    white-space: pre-line;
    line-height: 28px;
  `;
  
  static TinyText = styled.div`	
    font-size: 16px;
    font-weight: 400;
    white-space: pre-line;
    line-height: 28px;
  `;
  
  static Image = styled.img`
    position: relative;
  `;
  
  static Button = styled.button`
  background-color: #0139CC;
  color: #FFFFFF;
  border-width: 0;
  
  &:hover{
    cursor: pointer;
    text-decoration: none;
  }  
  &:active{
    background-color: #5383FF;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
`;


  static selectorStyle = {
    container: (provider) => ({
      ...provider,
      // backgroundColor: 'rgba(0,0,0,0)'
      // width: '130px',
      width: '100%',
      display: 'flex'
    }),
  
    control: (provider) => ({
      ...provider,
      borderRadius: '0',
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#919191',
      fontSize: '18px',
      borderWidth: '0',
      // width: '100%'
    }),
  
    valueContainer: (provider) => ({
      ...provider,
      // backgroundColor: 'rgba(0,0,0,0)',
      color: '#919191',
      fontSize: '18px',
    }),
    
    singleValue: (provider) => ({
      ...provider,
      // backgroundColor: 'rgba(0,0,0,0)',
      color: '#919191',
      fontSize: '18px',
    }),
  
    placeholder: (provider) => ({
      ...provider,
      // fontSize: '0.875rem'
      fontSize: '18px'
    }),
  
    indicatorsContainer: (provider) => ({
      padding: '0px',
      backgroundColor: 'rgba(0,0,0,0)',
    }),
  
    indicatorSeparator: (provider) => ({
  
    }),
    
    menu: (provider) => ({
      ...provider,
      color: '#919191',
      fontSize: '18px',
      
      // backgroundColor: 'rgba(0,0,0,0)',
    }),
  };
  
}

export default CommonStyle;

