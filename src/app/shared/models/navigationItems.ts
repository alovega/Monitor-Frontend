
export class NavigationItems {
    navItems = [
        {
          displayName: 'Dashboard',
          iconName: 'pie_chart',
          routerLink: 'dashboard/metrics',
        },
        {
          displayName: 'Events',
          iconName: 'event',
          routerLink: 'dashboard/events'
        },
        {
          displayName: 'Incidents',
          iconName: 'bug_report',
          routerLink: 'dashboard/incidents'
        },
        {
          displayName: 'Users',
          iconName: 'account_box',
          routerLink: 'dashboard/users'
        },
        {
          displayName: 'Configurations',
          iconName: 'group',
          children: [
            {
              displayName: 'Recipients',
              iconName: 'contacts',
              routerLink: 'dashboard/recipients'
            },
            {
              displayName: 'System Recipients',
              iconName: 'accessibility',
              routerLink: 'dashboard/system-recipients'
            },
            {
              displayName: 'Endpoints',
              iconName: 'data_usage',
              routerLink: 'dashboard/endpoints'
            },
            {
              displayName: 'Rules',
              iconName: 'bookmark',
              routerLink: 'dashboard/rules'
            },
          ]
        },
        {
          displayName: 'Notifications',
          iconName: 'notifications',
          routerLink: 'dashboard/notifications/email-notification'
        },
        {
          displayName: 'Setup-User',
          iconName: 'add',
          routerLink: 'dashboard/setup-user'
        },
      ];
}
