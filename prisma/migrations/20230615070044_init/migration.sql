-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "like" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGeneralInfo" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" INTEGER NOT NULL,
    "mentorId" INTEGER,

    CONSTRAINT "UserGeneralInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeacherToUserGeneralInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGeneralInfo_profileId_key" ON "UserGeneralInfo"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherToUserGeneralInfo_AB_unique" ON "_TeacherToUserGeneralInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherToUserGeneralInfo_B_index" ON "_TeacherToUserGeneralInfo"("B");

-- AddForeignKey
ALTER TABLE "UserGeneralInfo" ADD CONSTRAINT "UserGeneralInfo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGeneralInfo" ADD CONSTRAINT "UserGeneralInfo_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToUserGeneralInfo" ADD CONSTRAINT "_TeacherToUserGeneralInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherToUserGeneralInfo" ADD CONSTRAINT "_TeacherToUserGeneralInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGeneralInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
