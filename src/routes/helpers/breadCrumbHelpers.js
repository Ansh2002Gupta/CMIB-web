import { SESSION_PATHS } from "../../constant/constant";

export const getLabelForPath = ({ isEdit, path, pathSegments }) => {
  const detailPageBreadCrumbLabelId = {
    "setup-centers": "label.session.setupCenters.details",
    "orientation-centers": "label.session.orientationCenters.details",
    "setup-mock-interview": "label.session.setupMockInterview.details",
    "consent-marking": "label.session.consentMarking.details",
    "campus-interview": "label.session.campusInterview.details",
    users: "label.users.details",
  };

  if (SESSION_PATHS.includes(path)) {
    return `label.session.${path}`;
  }
  if (path === "details" && isEdit) {
    return "label.path.editDetails";
  }
  if (path === "details") {
    const relevantSegment = pathSegments.find(
      (segment) => segment === "users" || SESSION_PATHS.includes(segment)
    );
    const labelId = detailPageBreadCrumbLabelId[relevantSegment] || "";
    return labelId;
  }
  return `label.path.${path}`;
};
