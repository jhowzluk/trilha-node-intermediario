const rootElement = document.getElementById('root');

const App = () => {
  const handleClick = () => {
    alert('React funcionando! Esta parte é Client-Side.');
  };

  return React.createElement('div', null, [
    React.createElement('p', { key: 1 }, 'Componente React renderizado no cliente'),
    React.createElement('button', { onClick: handleClick, key: 2 }, 'Clique aqui')
  ]);
};

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));
