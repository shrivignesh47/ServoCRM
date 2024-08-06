// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import initStore from 'app/config/store';
// import Header from './header';

// describe('Header', () => {
//   let mountedWrapper;
  
//   const devProps = {
//     isAuthenticated: true,
//     isAdmin: true,
//     ribbonEnv: 'dev',
//     isInProduction: false,
//     isOpenAPIEnabled: true,
//   };
  
//   const prodProps = {
//     ...devProps,
//     ribbonEnv: 'prod',
//     isInProduction: true,
//     isOpenAPIEnabled: false,
//   };
  
//   const userProps = {
//     ...prodProps,
//     isAdmin: false,
//   };
  
//   const guestProps = {
//     ...prodProps,
//     isAdmin: false,
//     isAuthenticated: false,
//   };

//   const renderComponent = (props = devProps) => {
//     const store = initStore();
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Header {...props} />
//         </MemoryRouter>
//       </Provider>
//     );
//   };

//   beforeEach(() => {
//     mountedWrapper = undefined;
//   });

//   it('Renders a Header component in dev profile with LoadingBar, Navbar, Nav and dev ribbon.', () => {
//     renderComponent();

//     expect(screen.getByRole('navigation')).toBeInTheDocument();
//     expect(screen.getByText('admin-menu')).toBeInTheDocument();
//     expect(screen.getByText('entity-menu')).toBeInTheDocument();
//     expect(screen.getByText('account-menu')).toBeInTheDocument();
//     expect(screen.getByText('ribbon')).toBeInTheDocument(); // Adjust based on actual ribbon text or element
//   });

//   it('Renders a Header component in prod profile with LoadingBar, Navbar, Nav.', () => {
//     renderComponent(prodProps);

//     expect(screen.getByRole('navigation')).toBeInTheDocument();
//     expect(screen.queryByText('admin-menu')).not.toBeInTheDocument();
//     expect(screen.getByText('entity-menu')).toBeInTheDocument();
//     expect(screen.getByText('account-menu')).toBeInTheDocument();
//     expect(screen.queryByText('ribbon')).not.toBeInTheDocument();
//   });

//   it('Renders a Header component in prod profile with logged in User', () => {
//     renderComponent(userProps);

//     expect(screen.getByRole('navigation')).toBeInTheDocument();
//     expect(screen.queryByText('admin-menu')).not.toBeInTheDocument();
//     expect(screen.getByText('entity-menu')).toBeInTheDocument();
//     expect(screen.getByText('account-menu')).toBeInTheDocument();
//   });

//   it('Renders a Header component in prod profile with no logged in User', () => {
//     renderComponent(guestProps);

//     expect(screen.getByRole('navigation')).toBeInTheDocument();
//     expect(screen.queryByText('admin-menu')).not.toBeInTheDocument();
//     expect(screen.queryByText('entity-menu')).not.toBeInTheDocument();
//     expect(screen.getByText('account-menu')).toBeInTheDocument();
//   });
// });
import '@testing-library/jest-dom'; // Ensure this import is included
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import initStore from 'app/config/store';
import Header from './header';

describe('Header', () => {
  const devProps = {
    isAuthenticated: true,
    isAdmin: true,
    ribbonEnv: 'dev',
    isInProduction: false,
    isOpenAPIEnabled: true,
  };

  const prodProps = {
    ...devProps,
    ribbonEnv: 'prod',
    isInProduction: true,
    isOpenAPIEnabled: false,
  };

  const userProps = {
    ...prodProps,
    isAdmin: false,
  };

  const guestProps = {
    ...prodProps,
    isAdmin: false,
    isAuthenticated: false,
  };

  const renderComponent = (props = devProps) => {
    const store = initStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header {...props} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('Renders a Header component in dev profile with LoadingBar, Navbar, Nav and dev ribbon.', () => {
    renderComponent();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('admin-menu')).toBeInTheDocument();
    expect(screen.getByText('entity-menu')).toBeInTheDocument();
    expect(screen.getByText('account-menu')).toBeInTheDocument();
    expect(screen.getByText('ribbon')).toBeInTheDocument(); // Adjust based on actual ribbon text or element
  });

  it('Renders a Header component in prod profile with LoadingBar, Navbar, Nav.', () => {
    renderComponent(prodProps);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByText('admin-menu')).not.toBeInTheDocument();
    expect(screen.getByText('entity-menu')).toBeInTheDocument();
    expect(screen.getByText('account-menu')).toBeInTheDocument();
    expect(screen.queryByText('ribbon')).not.toBeInTheDocument();
  });

  it('Renders a Header component in prod profile with logged in User', () => {
    renderComponent(userProps);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByText('admin-menu')).not.toBeInTheDocument();
    expect(screen.getByText('entity-menu')).toBeInTheDocument();
    expect(screen.getByText('account-menu')).toBeInTheDocument();
  });

  it('Renders a Header component in prod profile with no logged in User', () => {
    renderComponent(guestProps);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByText('admin-menu')).not.toBeInTheDocument();
    expect(screen.queryByText('entity-menu')).not.toBeInTheDocument();
    expect(screen.getByText('account-menu')).toBeInTheDocument();
  });
});
