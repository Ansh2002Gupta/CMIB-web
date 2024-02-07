function getConfig(config = []) {
    const _config = config.reduce((acc, val) => {
      const route = {};
      if (val?.pagePath) {
        route.path = val?.pagePath || '';
      }
      if (val?.element) {
        route.element = val?.element || null;
      }
      if (val?.views) {
        route.children = [];
        (val?.views || []).forEach((view) => {
          const childRoute = {};
          childRoute.path = view?.viewPath || '';
          childRoute.element = view?.element || null;
          route.children.push(childRoute);
        })
      }
      acc.push(route)
      return acc;
    }, [])
    return _config;
}
export default getConfig;
