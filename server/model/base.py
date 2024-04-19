from datetime import datetime
from sqlalchemy import UniqueConstraint, text, types, ForeignKey
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
import uuid


class Base(DeclarativeBase):
    pass


class Translation(Base):
    __tablename__ = "translation"
    id: Mapped[uuid.UUID] = mapped_column(
        types.UUID,
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    original: Mapped[str] = mapped_column(types.String, nullable=False)
    final: Mapped[str] = mapped_column(types.String, nullable=True)
    steps: Mapped[str] = mapped_column(types.JSON, nullable=True)
    similarity: Mapped[float] = mapped_column(types.Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        types.DateTime, nullable=False, server_default=text("now()")
    )

    def __repr__(self) -> str:
        return f"Translation(id={self.id}, original={self.original}, final={self.final}, steps={self.steps}, similarity={self.similarity})"


class StepExplanation(Base):
    __tablename__ = "step_explanation"
    id: Mapped[uuid.UUID] = mapped_column(
        types.UUID,
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    translation_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("translation.id"),
        nullable=False,
    )
    step_index: Mapped[int] = mapped_column(types.Integer, nullable=False)
    explanation: Mapped[str] = mapped_column(types.String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        types.DateTime, nullable=False, server_default=text("now()")
    )

    __table_args__ = (
        UniqueConstraint(
            "translation_id", "step_index", name="_translation_step_index_uc"
        ),
    )

    def __repr__(self) -> str:
        return f"StepExplanation(id={self.id}, translation_id={self.translation_id}, step={self.step}, explanation={self.explanation})"


class Article(Base):
    __tablename__ = "article"
    id: Mapped[uuid.UUID] = mapped_column(
        types.UUID,
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )
    url: Mapped[str] = mapped_column(types.String, nullable=False)
    text_content: Mapped[str] = mapped_column(types.String, nullable=False)
    summary: Mapped[str] = mapped_column(types.String, nullable=False)
    headlines: Mapped[str] = mapped_column(types.JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        types.DateTime, nullable=False, server_default=text("now()")
    )

    def __repr__(self) -> str:
        return f"Article(id={self.id}, url={self.url}, content={self.text_content}, summary={self.summary})"
