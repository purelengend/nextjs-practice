"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
} from "@nextui-org/react";
import { useTheme } from "next-themes";

// Components
import { Button } from "../common";
import { DarkModeIcon, LightModeIcon, RightArrowIcon } from "../common/Icons";

// Constants
import { NAV_LIST_DESKTOP, NAV_LIST_MOBILE } from "@/constants";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(isLightMode ? "light" : "dark");
  }, [isLightMode, setTheme]);

  const onChangeTheme = () => setIsLightMode((prev) => !prev);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent"
      isBlurred={false}
    >
      <NavbarContent>
        <div className="flex gap-3 base:gap-11 lg:gap-22 items-center">
          <NavbarBrand as="div">
            <Link href="/" className="text-foreground text-2xl font-bold">
              Brandname
            </Link>
          </NavbarBrand>

          <NavbarContent className="hidden md:flex gap-2 base:gap-4">
            {NAV_LIST_DESKTOP.map((item) => (
              <NavbarItem key={item.id}>
                <Link
                  href={item.destination}
                  className="text-foreground-100 text-sm/6 font-bold hover:text-primary"
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
      </NavbarContent>

      <NavbarContent justify="end" className=" gap-2 base:gap-4">
        <NavbarItem>
          <Switch
            isSelected={isLightMode}
            size="lg"
            color="primary"
            thumbIcon={({ isSelected }) =>
              isSelected ? <LightModeIcon /> : <DarkModeIcon />
            }
            className="hidden md:flex"
            classNames={{
              wrapper: "bg-foreground-100",
            }}
            onValueChange={onChangeTheme}
          />
        </NavbarItem>

        <NavbarItem>
          <Button
            color="primary"
            className="text-sm/5.5 font-bold hidden md:flex"
            variant="light"
            size="md"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            className="text-white text-sm/5.5 font-bold hidden md:flex"
            size="md"
            endContent={<RightArrowIcon />}
          >
            JOIN US
          </Button>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>
      <NavbarMenu className="pl-9">
        {NAV_LIST_MOBILE.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={item.destination}
              className="text-foreground-100 text-sm/6 font-bold hover:text-primary"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Switch
            isSelected={isLightMode}
            size="lg"
            color="primary"
            thumbIcon={({ isSelected }) =>
              isSelected ? <LightModeIcon /> : <DarkModeIcon />
            }
            className="md:hidden"
            classNames={{
              wrapper: "bg-foreground-100",
            }}
            onValueChange={onChangeTheme}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
