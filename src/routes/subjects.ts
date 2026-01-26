import { Router } from "express";
import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import { departments, subjects } from "../db/schema";
import { db } from "../db";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { search, department, page = "1", limit = "10" } = req.query;

        const searchStr = typeof search === "string" ? search : undefined;
        const departmentStr =
            typeof department === "string" ? department : undefined;

        const currentPage = Math.max(1, Number(page) || 1);
        const limitPerPage = Math.min(100, Math.max(1, Number(limit) || 10));
        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        if (searchStr) {
            filterConditions.push(
                or(
                    ilike(subjects.name, `%${searchStr}%`),
                    ilike(subjects.code, `%${searchStr}%`)
                )
            );
        }

        if (departmentStr) {
            filterConditions.push(
                ilike(departments.name, `%${departmentStr}%`)
            );
        }

        const whereClause =
            filterConditions.length > 0 ? and(...filterConditions) : undefined;

        // ✅ Count query
        const countQuery = db
            .select({ count: sql<number>`count(*)` })
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id));

        if (whereClause) {
            countQuery.where(whereClause);
        }

        const countResult = await countQuery;
        const totalCount = Number(countResult[0]?.count ?? 0);

        // ✅ Data query
        const dataQuery = db
            .select({
                ...getTableColumns(subjects),
                department: { ...getTableColumns(departments) },
            })
            .from(subjects)
            .leftJoin(departments, eq(subjects.departmentId, departments.id))
            .orderBy(desc(subjects.createdAt))
            .limit(limitPerPage)
            .offset(offset);

        if (whereClause) {
            dataQuery.where(whereClause);
        }

        const subjectsList = await dataQuery;

        res.status(200).json({
            data: subjectsList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage),
            },
        });
    } catch (e) {
        console.error("GET /subjects error:", e);
        res.status(500).json({ error: "Failed to get subjects" });
    }
});

export default router;
