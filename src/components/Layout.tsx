import { ReactNode } from "react";
import { Header } from "./Header";
import { Tabs } from "./Tabs";

import styles from '../styles/components/Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layoutContainer}>
            <Header />

            {children}

            <Tabs />
        </div>
    );
}