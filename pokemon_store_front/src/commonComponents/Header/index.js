import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Container } from "@mui/material";

import { StoreButton } from "./components/StoreButton";
import { AccountButton } from "./components/AccountButton";
import { CartButton } from "./components/CartButton";
import { LogoutButton } from "./components/LogoutButton";

import { NAVIGATION } from "./config";
import { isAuthSelector } from "../../pages/signIn/selectors/isAuthSelector";

import logo from "../../static/images/logo.svg";

import classes from "./Header.module.css";

export const Header = () => {
    const { isAuth } = useSelector(isAuthSelector);

    const navigationItems = useMemo(() => {
        const targetNavigationItems = isAuth ? "PRIVATE" : "PUBLIC";

        return NAVIGATION[targetNavigationItems];
    }, [isAuth]);

    return (
        <div className={classes.header}>
            <Container>
                <div className={classes.wrapper}>
                    <div className={classes.logo}>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={classes.navigation}>
                        {navigationItems.map(({ title, path }) => {
                            return (
                                <NavLink
                                    key={title}
                                    to={path}
                                    className={({ isActive }) => {
                                        return `${classes.link} ${
                                            isActive && classes.active
                                        }`;
                                    }}
                                >
                                    {title}
                                </NavLink>
                            );
                        })}
                        {isAuth && (
                            <>
                                <StoreButton />
                                <AccountButton />
                                <CartButton />
                                <LogoutButton />
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
