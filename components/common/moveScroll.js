import { useRef } from 'react';

//hook
function UseMoveScrool() {
  const element = useRef();
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return { element, onMoveToElement};
}

export default UseMoveScrool;


