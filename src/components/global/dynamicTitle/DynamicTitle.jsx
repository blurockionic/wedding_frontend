import  { useEffect } from 'react';
import PropTypes from "prop-types"

const DynamicTitle = ({ title }) => {
  useEffect(() => {
    document.title = `Wedding | ${title}`;
  }, [title]);

  return null; // This component doesn't render anything
};

DynamicTitle.propTypes ={
    title: PropTypes.string
}



export default DynamicTitle;
