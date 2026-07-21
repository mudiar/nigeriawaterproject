"use client";

import dynamic from "next/dynamic";

const ProjectMap = dynamic(
  () =>
    import("@/components/map/ProjectMap").then((mod) => mod.ProjectMap),
  {
    ssr: false,
    loading: () => (
      <div className="map-wrap map-loading" aria-label="Loading Edo State map">
        <div className="map-label">
          <strong>Edo State, Nigeria</strong>
          <span>Loading Community Water Points…</span>
        </div>
      </div>
    ),
  },
);

export function ProjectMapSection() {
  return <ProjectMap />;
}
