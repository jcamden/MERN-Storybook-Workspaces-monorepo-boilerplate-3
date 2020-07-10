import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthDispatchContext, AuthStateContext } from '../../../context/auth/AuthState';

export type TodoItemProps = {
  title: string;
  completed: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ title, completed }) => {
  const dispatch = useContext(AuthDispatchContext);
  const { user } = useContext(AuthStateContext);

  return (
    <div className="todoItem">
      <input
        type="checkbox"
        checked={completed}
        onClick={(): void => {
          if (!user) {
            alert('Please login to click this!');
          }
        }}
        onChange={(): void => {
          if (user) {
            // Typescript wrongly thinks dispatch can be undefined.
            // Satsify her thusly:
            dispatch({ type: 'toggleTodoCompleted', payload: title });
          }
        }}
      />
      {` `}
      {title}
    </div>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;