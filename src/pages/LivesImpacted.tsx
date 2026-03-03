import React from "react";
import { Stories } from "./Stories";
import { Page } from "../types/types";

interface LivesImpactedProps {
    setPage?: (page: Page) => void;
}

const LivesImpacted: React.FC<LivesImpactedProps> = ({ setPage }) => {
    return (
        <Stories
            setPage={setPage}
            title="Lives Impacted"
            statusFilter="Completed"
        />
    );
};

export default LivesImpacted;