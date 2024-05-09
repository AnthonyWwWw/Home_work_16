function Student(firstName, lastName, birthYear, evaluations) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.evaluations = evaluations;
    this.visiting = [];
    this.visitingFilled = false;

    this.briefDescription = function(){
        const currentYear = this.getAge();
        alert(`Ім'я студента: ${this.firstName} \nВік: ${currentYear} \nСередній бал: ${this.getAverageScore()} \nВідвідано ${this.countNumberOfClassesAttended()} занять з ${this.visiting.length}`);
    }

    this.countNumberOfClassesAttended = function(){
        let classesAttended = isNaN(this.classesAttended) ? this.visiting.filter(item => item === true) : 0;
        return classesAttended.length;
    }

    this.getAge = function() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    };

    this.getAverageScore = function() {
        const total = this.evaluations.reduce((accumulator, currentValue) => accumulator + currentValue);
        return Math.floor(total / this.evaluations.length);
    };

    this.present = function() {
        if (!this.visitingFilled) {
            if (this.visiting.length <= 24) {
                this.visiting.push(true);
            } else {
                this.visitingFilled = true;
            }
        } else {
            alert(`${this.firstName} закінчив семестр`);
        }
    };

    this.absent = function() {
        if (!this.visitingFilled) {
            if (this.visiting.length <= 24) {
                this.visiting.push(false);
            } else {
                this.visitingFilled = true;
            }
        } else {
            alert(`${this.firstName} закінчив семестр`);
        }
    };

    this.checkFilledRatio = function() {
        const filledCount = this.visiting.reduce((acc, val) => acc + (val ? 1 : 0), 0); 
        return Math.floor(((filledCount / this.visiting.length) * 10)) / 10;
    };
    
    this.summary = function() {
        const averageScore = this.getAverageScore();
        const attendanceRatio = this.checkFilledRatio();

        if (averageScore >= 90 && attendanceRatio >= 0.9) {
            return 'Молодець!';
        } else if (averageScore > 90 || attendanceRatio > 0.9) {
            return 'Добре, але можна краще';
        } else {
            return 'Редиска!';
        }    
    };
};

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');

    const students = [
        new Student('John', 'Doe', 1998, [100, 100, 100, 100, 100]),
        new Student('Alice', 'Smith', 1999, [90, 90, 95, 90, 95]),
        new Student('Bob', 'Johnson', 2000, [85, 90, 88, 92, 85])
    ];

    students.forEach(student => {
        const card = document.createElement('div');
        card.classList.add('user-card');

        card.innerHTML = `
            <div class='user-content'>
                <h2>${student.firstName} ${student.lastName}</h2>
                <p>Вік: ${student.getAge()}</p>
                <p>Середній бал: ${student.getAverageScore()}</p>
                <p>Відношення відвідування: ${isNaN(student.checkFilledRatio()) ? 0 : student.checkFilledRatio()}</p>
                <p>Висновок: ${student.summary()}</p>
            </div>
            <div>
                <button class='buttonSummary'>Drief description</button>
                <button class='buttonAbsent'>Skip class</button>
                <button class='buttonPresent'>Attend class</button>
            </div>
        `;

        const buttonSummary = card.querySelector('.buttonSummary');
        const buttonAbsent = card.querySelector('.buttonAbsent');
        const buttonPresent = card.querySelector('.buttonPresent');

        buttonSummary.addEventListener('click', function(event){
            event.stopPropagation();
            student.briefDescription();
        })

        buttonAbsent.addEventListener('click', function(event) {
            event.stopPropagation();
            student.absent();
            updateUserContent(card, student);
        });

        buttonPresent.addEventListener('click', function(event) {
            event.stopPropagation();
            student.present();
            updateUserContent(card, student);
        });

        cardsContainer.appendChild(card);
    });

    function updateUserContent(card, student) {
        const userContent = card.querySelector('.user-content');
        userContent.innerHTML = `
            <h2>${student.firstName} ${student.lastName}</h2>
            <p>Вік: ${student.getAge()}</p>
            <p>Середній бал: ${student.getAverageScore()}</p>
            <p>Відношення відвідування: ${student.checkFilledRatio()}</p>
            <p>Висновок: ${student.summary()}</p>
        `;
    }
});
