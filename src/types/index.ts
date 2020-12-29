export interface NavigationOptions {
    headerStyle: any,
    headerLeft: () => React.ReactNode,
    headerRight: () => React.ReactNode,
    headerTitle: string
}

export type ButtonState = 'default' | 'focused' | 'unfocused'

export interface EasingInfo {
    name: string,
    function: any
}
