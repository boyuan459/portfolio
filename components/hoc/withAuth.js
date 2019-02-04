import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../BasePage";

const namespace = "http://localhost:3000";

export default role => Component =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(args);
      }
      return { ...pageProps };
    }

    renderProtectedPage() {
      const { isAuthenticated, user } = this.props.auth;
      const userRole = user && user[`${namespace}/role`];
      let isAuthorized = false;

      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      if (!isAuthenticated) {
        return (
          <BaseLayout {...this.props}>
            <BasePage>You are not authenticated, please login!</BasePage>
          </BaseLayout>
        );
      }

      if (!isAuthorized) {
        return (
          <BaseLayout {...this.props}>
            <BasePage>You are not authorized to access this page</BasePage>
          </BaseLayout>
        );
      }

      return <Component {...this.props} />;
    }
    render() {
      return this.renderProtectedPage();
    }
  };
