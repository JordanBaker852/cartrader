const defineNextRouteMiddleware = ((to: any, from: any) => {

    if (!inProfileRoute(to.path))
    {
        return;
    }

    const user = useSupabaseUser();

    if (!user.value) {
        return navigateTo('/login');
    }

    return;
});

const inProfileRoute = (path: string): boolean => {
    return path.includes("profile");
};

export default defineNextRouteMiddleware;