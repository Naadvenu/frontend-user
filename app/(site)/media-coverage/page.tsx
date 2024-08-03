import React from "react";
import GalleryComponent from "components/Gallery/index"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Workshops - Naadvenu Flute Classes",
  description: "This is a Events Workshops Gallery page of Naadvenu Flute Classes",
  // other metadata
};

const EventsWorkshopsPage = () => {
  return (
    <div className="pb-20 pt-40">
      <GalleryComponent category="Media Coverage" />
    </div>
  );
};

export default EventsWorkshopsPage;
