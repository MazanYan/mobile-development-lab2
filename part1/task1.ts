interface Student {
    name: string,
    group: string,
    marks: StudentMark[] | undefined,
    finalMark: number | undefined
}

interface StudentMark {
    subject: string,
    mark: number
}

let studentsStr = `
Хаустова Екатерина 4.1; Кириллова Елена 4.1; 
Марков Иван 4.1; Пашков Данил 4.1; 
Бакуменко Олег 4.1; Кириченко Анастасия 4.1; 
Гусев Евгений 4.1; Белоконь Александр 4.2; 
Архипов Антон 4.1; Кравцов Роман 4.1; 
Нинидзе Давид 4.2; Кашилов Иван 4.2; 
Кравцов Максим 4.2; Коваленко Алексей 4.2; 
Бочкарёва Дария 4.2; Ульянов Михаил 4.2; 
Сенчукова Ангелина 4.1; Лебедев Евгений 4.1; 
Галайчук Виталий 4.2`;

// 1
const studentsArray: Student[] = studentsStr.split('; ')
    .map(stud => stud.replace('\n', ''))
    .map(stud => {
        const studArr = stud.split(' ');
        return {
            name: `${studArr[0]} ${studArr[1]}`,
            group: studArr[2]
        } as Student;
    }).sort((stud1: Student, stud2: Student) => stud1.name.localeCompare(stud2.name));

console.log(studentsArray)

const groups: string[] = studentsArray.map(stud => stud.group)
    .filter((val, i, arr) => arr.indexOf(val) === i);

const studentsInGroup = Object.fromEntries(
    groups.map(group =>
        [group, studentsArray.filter(stud => stud.group === group) as Student[]]
    )
);

console.log(studentsInGroup);

// 2
let points = [
    { subject: "Основы Swift", maxPoints: 5 },
    { subject: "Классы Swift", maxPoints: 5 },
    { subject: "Делегирование", maxPoints: 10 },
    { subject: "Интерфейс", maxPoints: 10 },
    { subject: "Хранение данных", maxPoints: 10 },
    { subject: "Core Data", maxPoints: 10 },
    { subject: "Лаб 7", maxPoints: 10 },
    { subject: "Лаб 8", maxPoints: 15 },
    { subject: "Лаб 9", maxPoints: 15 },
    { subject: "Лаб 10", maxPoints: 10}
];

const studentMarks = studentsArray.map(stud => {
    const marks: StudentMark[] = points.map(subj => ({
        subject: subj.subject,
        mark: Math.floor(Math.random() * subj.maxPoints)
    }));
    return { ...stud, marks };
});

console.log(studentMarks);

// 3
const studentsFinalMarks = studentMarks.map(stud => ({
    name: stud.name,
    group: stud.group,
    finalMark: stud.marks.map(mark => mark.mark).reduce((total, mark) => total + mark)
}));

console.log(studentsFinalMarks);

const groupMarks = Object.fromEntries(
    groups.map(group =>
        [group, studentsFinalMarks.filter(stud => stud.group === group) as Student[]]
    )
);

console.log(groupMarks);

const averageMarksEntries = Object.entries(groupMarks).map((entry: object) => {
    // @ts-ignore
    const [group, students] = entry;
    const averageMark = students.reduce(
        (finalMark: number, stud: Student) => finalMark + stud.finalMark!, 0
    ) / students.length;
    const passed = students.filter((stud: Student) => stud.finalMark! >= 40).length;
    const notPassed = students.length - passed;
    return [group, { averageMark, passed, notPassed }];
});

const averageMarks = Object.fromEntries(averageMarksEntries);
console.log(averageMarks);
