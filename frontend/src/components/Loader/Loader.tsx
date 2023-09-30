'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import cx from 'classnames';
import styles from './Loader.scss';

interface LoaderProps {
  isCentered?: boolean;
}

export default function Loader({isCentered = false} : LoaderProps) {
  return <Spin className={cx(styles.loader, isCentered && styles.centered)} indicator={<LoadingOutlined />} />;
}
