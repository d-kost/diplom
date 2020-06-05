import React from 'react';
import PropTypes from 'prop-types';

const ErrorComponent = (props) => {

  return (
    <>
      {props.error && <div>Что-то пошло не так.</div>}

      {props.serverError && <div>Сервер не отвечает.</div>}
    </>
  )
}

ErrorComponent.propTypes = {
  error: PropTypes.bool,
  serverError: PropTypes.bool
}

export default ErrorComponent;