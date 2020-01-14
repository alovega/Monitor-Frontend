export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    routerLink?: string;
    children?: NavItem[];
}

