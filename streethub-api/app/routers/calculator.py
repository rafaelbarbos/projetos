import time
from datetime import datetime, timezone

import httpx
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/calculator", tags=["calculator"])

AWESOMEAPI_URL = "https://economia.awesomeapi.com.br/json/last/CNY-BRL"
FALLBACK_RATE = 0.75
CACHE_TTL_SECONDS = 600
FALLBACK_CACHE_TTL_SECONDS = 60  # tenta de novo mais rápido se a fonte externa falhou


class ExchangeRateResponse(BaseModel):
    rate: float
    updatedAt: str
    source: str


_cache: ExchangeRateResponse | None = None
_cache_ttl: float = 0.0
_cache_fetched_at: float = 0.0


def _fetch_rate() -> ExchangeRateResponse:
    try:
        response = httpx.get(AWESOMEAPI_URL, timeout=5.0)
        response.raise_for_status()
        data = response.json()["CNYBRL"]
        return ExchangeRateResponse(
            rate=float(data["bid"]),
            updatedAt=datetime.fromtimestamp(int(data["timestamp"]), tz=timezone.utc).isoformat(),
            source="awesomeapi",
        )
    except Exception:
        return ExchangeRateResponse(
            rate=FALLBACK_RATE,
            updatedAt=datetime.now(timezone.utc).isoformat(),
            source="fallback",
        )


@router.get("/exchange-rate", response_model=ExchangeRateResponse)
def get_exchange_rate() -> ExchangeRateResponse:
    global _cache, _cache_ttl, _cache_fetched_at

    now = time.time()
    if _cache is not None and (now - _cache_fetched_at) < _cache_ttl:
        return _cache

    result = _fetch_rate()
    _cache = result
    _cache_ttl = CACHE_TTL_SECONDS if result.source == "awesomeapi" else FALLBACK_CACHE_TTL_SECONDS
    _cache_fetched_at = now
    return result
