import React from "react";
import { Button, Result } from "antd";
import styles from "./not-found.module.css";

const NotFound: React.FC = () => (
  <Result
    className={styles.container}
    status="404"
    title="404"
    subTitle="Sorry, the page you are looking for does not exist."
    extra={
      <Button type="primary" href="/nerasol/dashboard/financial">
        Back Home
      </Button>
    }
  />
);

export default NotFound;
