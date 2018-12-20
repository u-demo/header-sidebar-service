import React from 'react';
import PropTypes from 'prop-types';
import TagRatingsEnroll from './TagRatingsEnroll.jsx';
import styles from '../styles/FixedHeader.css';

const FixedHeader = ({ course }) => (
  <div className={ styles.fixedBanner }>
    <div className={ styles.fixedContent }>
      <p className={ styles.smallTitle }><strong>{ course.title }</strong></p>
      <TagRatingsEnroll course={ course } isHeaderFixed={ true } />
    </div>
  </div>
);

FixedHeader.propTypes = {
  course: PropTypes.object.isRequired,
};

export default FixedHeader;
