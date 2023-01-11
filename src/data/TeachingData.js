const teachingData = [
    {
        nome: 'Analisi Matematica',
        id: 'analisi_matematica',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Eleonora Cinti',
        periodo: '19/09/2022 - 21/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Programmazione',
        id: 'programmazione',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Antonella Carbonaro, Mirko Ravaioli',
        periodo: '19/09/2022 - 13/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Algebra e Geometria',
        id: 'algebra_e_geometria',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Luca Moci',
        periodo: '20/02/2023 - 06/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Algoritmi e Strutture dati',
        id: 'algoritmi_e_strutture_dati',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Luciano Margara, Moreno Marzolla',
        periodo: '20/02/2023 - 06/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Architetture degli Elaboratori',
        id: 'architetture_degli_elaboratori',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Davide Maltoni, Matteo Ferrara',
        periodo: '20/02/2023 - 06/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Matematica Discreta e Probabilità',
        id: 'matematica_discreta_e_probabilità',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Fabrizio Caselli, Jacopo Gandini',
        periodo: '21/09/2022 - 14/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Programmazione ad oggetti',
        id: 'programmazione_ad_oggetti',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Mirko Viroli, Danilo Pianini, Roberto Casadei',
        periodo: '15/09/2022 - 20/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Sistemi Operativi',
        id: 'sistemi_operativi',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Vittorio Ghini',
        periodo: '15/09/2022 - 21/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Basi di Dati',
        id: 'basi_di_dati',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Annalisa Franco',
        periodo: '20/02/2022 - 06/06/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Fisica',
        id: 'fisica',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Luigi Guiducci',
        periodo: '22/02/2023 - 31/05/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Metodi Numerici',
        id: 'metodi_numerici',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Damiana Lazzaro',
        periodo: '20/02/2023 al 06/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Programmazione di Reti',
        id: 'programmazione_di_reti',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Franco Callegati, Roberto Girau, Andrea Piroddi',
        periodo: '19/09/2022 - 21/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Ingegneria del Software',
        id: 'ingegneria_del_software',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Stefano Rizzi',
        periodo: '16/09/2022 - 25/11/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Reti di Telecomunicazione',
        id: 'reti_di_telecomunicazione',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Franco Callegati',
        periodo: '15/09/2022 - 21/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Tecnologie Web',
        id: 'tecnologie_web',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Silvia Mirri, Giovanni Delnevo',
        periodo: '16/09/2022 - 13/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Ricerca Operativa',
        id: 'ricerca_operativa',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Stefano Novellani',
        periodo: '21/02/2023 - 06/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Computer Graphics',
        id: 'computer_graphics',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Damiana Lazzaro',
        periodo: '15/09/2022 - 19/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Informatica e Diritto',
        id: 'informatica_e_diritto',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Andrea Amidei',
        periodo: '19/09/2022 - 21/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Sistemi Embedded e Internet-Of-Things',
        id: 'sistemi_embedded_e_internet-of-things',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Alessandro Ricci',
        periodo: '15/09/2022 - 19/12/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Basi di Dati Avanzate',
        id: 'basi_di_dati_avanzate',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Matteo Golfarelli, Alessandra Lumini',
        periodo: '22/02/2023 - 31/05/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Programmazione di Applicazioni Data Intensive',
        id: 'programmazione_di_appplicazioni_data_intensive',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Gianluca Moro, Roberto Pasolini',
        periodo: '20/02/2023 - 05/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Programmazione di Sistemi Mobile',
        id: 'programmazione_di_sistemi_mobile',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Catia Prandi',
        periodo: '20/02/2023 - 05/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Visione Artificiale',
        id: 'visione_artificiale',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Raffaele Cappelli',
        periodo: '23/02/2023 - 01/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'High Performance Computing',
        id: 'high_performance_computing',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Moreno Marzolla',
        periodo: '19/09/2022 - 30/11/2022',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Crittografia',
        id: 'crittografia',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Luciano Margara',
        periodo: '20/02/2023 - 05/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    },
    {
        nome: 'Virtualizzazione e Integrazione di Sistemi',
        id: 'virtualizzazione_e_integrazione_di_sistemi',
        corso: 'Ingegneria e Scienze Informatiche',
        idCorso: 'ingegneria_e_scienze_informatiche',
        docenti: 'Vittorio Ghini, Ciro Barbone, Enrico Fiumana',
        periodo: '21/02/2023 - 06/06/2023',
        aule: [
            {
                giorno: '16/09/2022',
                orario: '10:00 - 12:00',
                luogo: 'AULA 2.9',
                idLuogo: 'aula2.9',
                presenze: 80,
                stato: 'ok'
            },
            {
                giorno: '20/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 75,
                stato: 'ok'
            },
            {
                giorno: '23/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '27/09/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 78,
                stato: 'ok'
            },
            {
                giorno: '30/09/2022',
                orario: '14:00 - 16:00',
                luogo: 'AULA 2.12',
                idLuogo: 'aula2.12',
                presenze: 74,
                stato: 'ok'
            },
            {
                giorno: '04/10/2022',
                orario: '10:00 - 13:00',
                luogo: 'AULA 3.7',
                idLuogo: 'aula3.7',
                presenze: 73,
                stato: 'ok'
            },
            {
                giorno: '07/10/2022',
                orario: '09:00 - 13:00',
                luogo: 'LAB 3.1',
                idLuogo: 'lab3.1',
                presenze: 55,
                stato: 'attenzione'
            },
        ]
    }
];

export default teachingData