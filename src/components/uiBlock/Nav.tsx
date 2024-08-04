import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import {
    NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function Nav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href={'/'} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            PicsVault
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={'/testpage'} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            to test page
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <SignedOut>
                    <NavigationMenuItem>
                        <SignInButton />
                    </NavigationMenuItem>
                </SignedOut>
                <SignedIn>
                    <>
                        <NavigationMenuItem>
                            <Link href={'/create-post'} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    +Create
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <UserButton />
                        </NavigationMenuItem>
                    </>
                </SignedIn>
            </NavigationMenuList>
        </NavigationMenu>

    )
}