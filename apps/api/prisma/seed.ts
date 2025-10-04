//test funcionalities with database
import {faker} from '@faker-js/faker'
import { hash } from 'bcryptjs';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function seed(){

    await prisma.member.deleteMany()
    await prisma.project.deleteMany()
    await prisma.organization.deleteMany()
    await prisma.user.deleteMany()


   const passwordHash = await hash('loveyou', 1)

   const user = await prisma.user.create({
    data: {
    name: 'Rock rodrigues',
    email: 'rockerlala@gmea.com',
    passwordHash,
    avatarUrl: 'https://github.com/rackelrodrigues.png'
     }
 })

const anotherUser = await prisma.user.create({
  data: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash,
    avatarUrl: faker.image.avatar()
  }
})

const anotherUser1 = await prisma.user.create({
  data: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash,
    avatarUrl: faker.image.avatar()
  }
})


    

await prisma.organization.create({
  data: {
    name: 'Acme Inc(Admin)',
    domain: `meusite${faker.number.int()}.com`,
    ownerId: user.id,
    slug: 'acme-ADMIN',    
    avatarUrl: 'https://i.pravatar.cc/150?acme.com',
    shouldAttachUsersByDomain: true,
    projects:{
     createMany:{
        data: [
          {name: 'Project 1', 
            slug: faker.lorem.slug(5),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])
          },
          {name: 'Project 2',
            slug: faker.lorem.slug(5),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])},
          {name: 'Project 3', 
           slug: faker.lorem.slug(5),
           description: faker.lorem.paragraph(),
           avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])
          },
        ]
     }
    },
    members: {
      createMany: {
        data: [
          { userId: user.id, role: 'ADMIN' },
          { userId: anotherUser.id, role: 'MEMBER' },
          { userId: anotherUser1.id, role: 'MEMBER' }
        ]
      }
    }
  }
});

await prisma.organization.create({
  data: {
    name: 'Acme Inc(Member)',
    domain: `meusite${faker.number.int()}.com`,
    slug: 'acme-MEMBER',  
    ownerId: user.id,
    avatarUrl: 'https://i.pravatar.cc/150?u=acme.com',
    projects:{
     createMany:{
        data: [
          {name: 'Project 1', 
            slug: faker.lorem.slug(5),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])
          },
          {name: 'Project 2',
            slug: faker.lorem.slug(5),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])},
          {name: 'Project 3', 
           slug: faker.lorem.slug(5),
           description: faker.lorem.paragraph(),
           avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])
          },
        ]
     }
    },
    members: {
      createMany: {
        data: [
          { userId: user.id, role: 'MEMBER' },
          { userId: anotherUser.id, role: 'ADMIN' },
          { userId: anotherUser1.id, role: 'MEMBER' }
        ]
      }
    }
  }
});

await prisma.organization.create({
  data: {
    name: 'Acme Inc(BILLING)',
    domain: `meusite${faker.number.int()}.com`,
    slug: 'acme-BILLING',  
    ownerId: user.id,
    avatarUrl: 'https://i.pravatar.cc/150?u=acme.com',
    projects:{
     createMany:{
        data: [
          {
            name: 'Project 1', 
            slug: faker.lorem.slug(5),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])
          },
          {
            name: 'Project 2',
            slug: faker.lorem.slug(5),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])},
          {
           name: 'Project 3', 
           slug: faker.lorem.slug(5),
           description: faker.lorem.paragraph(),
           avatarUrl: faker.image.avatarGitHub(),
            ownerId: faker.helpers.arrayElement([
                user.id, anotherUser.id, anotherUser1.id
            ])
          },
        ]
     }
    },
    members: {
      createMany: {
        data: [
          { userId: user.id, role: 'BILLING' },
          { userId: anotherUser.id, role: 'ADMIN' },
          { userId: anotherUser1.id, role: 'MEMBER' }
        ]
      }
    }
  }
});


}
seed().then(()=>{
    console.log('Database seeded!')
})