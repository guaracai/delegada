document.addEventListener('DOMContentLoaded', function() {
    const mockEventDatabase = {
      '2023-11-01': [
        { title: 'Reunião de Equipe', description: 'Reunião mensal com a equipe.' }
      ],

      '2023-11-15': [
        { title: 'Feriado', description: 'Proclamação da República' }
        
      ],      

      '2024-04-06': [
        { title: 'Aniversário', description: 'Silvia' },
        
      ],
        
      '2024-04-30': [
        { title: 'Aniversário', description: 'Nathalia' },
        
      ],
        
      '2024-01-01': [
        { title: 'Feriado', description: 'Ano Novo' },
        
      ],
        
      '2024-02-13': [
        { title: 'Feriado', description: 'Carnaval' },
        
      ],
        
      '2023-11-02': [
        { title: 'Atividade Delegada', description: 'Cb PM Costa e Cb PM Celio das 09:00 às 17:00' },
        { title: 'Atividade Delegada', description: 'Cb PM Roberto e Sd PM Caldato das 15:59 às 23:59' }
        
      ],
        
      '2023-11-03': [
        { title: 'Atividade Delegada', description: 'Cb PM Roberto e Sd PM Caldato das 18:00 às 02:00 Delegada' },
        
      ],
        
      '2023-11-04': [
        { title: 'Atividade Delegada', description: 'Cb PM Cb PM Carlos e Cb PM Beraldo das 18:00 às 02:00' },
        
      ],
        
      '2023-11-05': [
        { title: 'Atividade Delegada', description: 'Cb PM Cb PM Costa e Sd PM Valentim das 15:59 às 23:59' },
        
      ],
        
      '2023-11-09': [
        { title: 'Atividade Delegada', description: 'Cb PM Cb Cb PM Celio e Sd PM Valentim das 15:59 às 23:59' },
        
      ],
        
      '2023-11-10': [
        { title: 'Atividade Delegada', description: 'Cb PM Costa e Cb PM Celio das 18:00 Às 02:00' },
        
      ],
        
      '2023-11-11': [
        { title: 'Atividade Delegada', description: 'Cb PM Cb PM Marta e Sd PM Caldato das 18:00 às 02:00' },
        
      ],
        
      '2023-11-12': [
        { title: 'Atividade Delegada', description: 'Cb Cb PM Roberto e Sd PM Zacarin das 15:59' },
        
      ]
      
          
    };
  
    const currentMonthYear = document.getElementById('current-month-year');
    const daysContainer = document.querySelector('.days');
    
    let today = new Date(2023, 10, 7);
    let currentDate = new Date(today);
  
    function updateMonthYearDisplay(date) {
      const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      currentMonthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }
  
    function clearCalendar() {
      daysContainer.innerHTML = '';
    }
  
    function addEmptyCells(startIndex) {
      for (let i = 0; i < startIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day empty';
        daysContainer.appendChild(emptyCell);
      }
    }
  
    function addDayCells(year, month) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = ' '; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
  
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dayElement.classList.add('current-day');
        }

        if (new Date(year, month, day).getDay() === 0) { // 0 representa o domingo
            dayElement.classList.add('sunday');
          }
  
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (mockEventDatabase[dateKey]) {
          dayElement.classList.add('has-event');
          dayElement.addEventListener('click', function() {
            showEventDetails(dateKey);
          });
        }
        daysContainer.appendChild(dayElement);
      }
    }
  
    function showEventDetails(dateKey) {
      const events = mockEventDatabase[dateKey];
      const eventList = document.getElementById('event-list');
      eventList.innerHTML = '';
  
      if (events) {
        events.forEach(event => {
          const eventItem = document.createElement('li');
          eventItem.innerHTML = `<strong>${event.title}</strong>: ${event.description}`;
          eventList.appendChild(eventItem);
        });
      } else {
        eventList.innerHTML = '<li>Nenhum evento para este dia.</li>';
      }
    }
  
    function generateCalendarDays(date) {
      clearCalendar();
      updateMonthYearDisplay(date);
  
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      const startDayIndex = (firstDayOfMonth === 0) ? 7 : firstDayOfMonth - 1;
  
      addEmptyCells(startDayIndex);
      addDayCells(date.getFullYear(), date.getMonth());
    }
  
    document.getElementById('prev').addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendarDays(currentDate);
    });
  
    document.getElementById('next').addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendarDays(currentDate);
    });
  
    generateCalendarDays(currentDate);
  });
  