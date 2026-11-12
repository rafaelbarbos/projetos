from typing import Literal

from pydantic import BaseModel

ReportReason = Literal["spam", "scam", "misleading", "other"]


class ReportCreateRequest(BaseModel):
    reason: ReportReason
