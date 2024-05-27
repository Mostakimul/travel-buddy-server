import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    if (isExistSuperAdmin) {
      console.log('Super admin already exist!');
      return;
    }

    const hashedPassword = await bcrypt.hash('superAdmin12345', 12);

    const superAdminData = await prisma.user.create({
      data: {
        email: 'super@admin.com',
        name: 'Super Admin',
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        userProfile: {
          create: {
            bio: 'Super Admin Bio',
            age: 20,
          },
        },
      },
    });

    console.log('Super Admin Created Successfully!', superAdminData);
  } catch (error) {
    console.error('Error creating data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
