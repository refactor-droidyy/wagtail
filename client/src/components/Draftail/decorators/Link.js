import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../Icon/Icon';

import TooltipEntity from '../decorators/TooltipEntity';

const getEmailAddress = mailto => mailto.replace('mailto:', '').split('?')[0];
const getDomainName = url => url.replace(/(^\w+:|^)\/\//, '').split('/')[0];

const Link = props => {
  const { entityKey, contentState } = props;
  const { linkType, url } = contentState.getEntity(entityKey).getData();
  let icon;
  let label;
  let tooltipURL;

  switch (linkType) {
  case 'email':
    icon = 'mail';
    tooltipURL = getEmailAddress(url);
    label = url;
    break;
  case 'page':
    icon = 'link';
    tooltipURL = url;
    label = url;
    break;
  case 'external':
  default:
    icon = 'link';
    tooltipURL = url;
    label = getDomainName(url);
    break;
  }

  return (
    <TooltipEntity
      {...props}
      icon={<Icon name={icon} />}
      label={label}
      url={tooltipURL}
    />
  );
};

Link.propTypes = {
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired,
};

export default Link;