import { Subject } from "../models/Subject";

export async function handleCreateSubject(req: any, res: any) {
  try {
    const { subjectId, name }: { subjectId: string; name: string } = req.body;

    if (!subjectId || !name) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const subject = await Subject.create({ subjectId, name });

    res.status(201).json({ message: "Subject created", subject });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
