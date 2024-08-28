import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, label, style, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            style={{ ...defaultStyles.button, ...style }}
            className={className}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    style: {},
    className: '',
    disabled: false,
};

const defaultStyles = {
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Button;
