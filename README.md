# **O que é?**

O projeto é um sistema completo para o monitoramento de pessoas que possuem
algum grau de dependência, como crianças ou pessoas com Alzheimer. Ele engloba
uma Pulseira de Identificação Pessoal, um sistema web e um aplicativo.

# **Como foi feito?**

Durante a construção do projeto, estão sendo aplicadas Metodologias Ágeis para
otimizar e controlar o desenvolvimento. Uma combinação de Scrum e Kanban é
utilizada, com um quadro de tarefas para um período de 2 semanas.

Após cada ciclo, a equipe (composta por 3 pessoas) se reúne para revisar o
progresso, discutir melhorias e definir as próximas tarefas com base nas
necessidades do projeto. Isso garante o controle do desenvolvimento em cada
Sprint.

No Front-end da página web, utiliza-se React.js com JSX e Styled Components para
criar código compacto e organizado. No aplicativo, o desenvolvimento é realizado
com React Native, facilitando a integração no Android e no iOS.

No Back-end, é implementado Java com REST e RESTful, incluindo medidas de
segurança como Rate Limit para proteção contra ataques DDoS, e uma API para
envio de SMS.

Para o armazenamento, foi escolhido o PostgreSQL no Amazon RDS devido à sua
robustez, confiabilidade e escalabilidade, garantindo uma gestão eficiente dos
dados com alto desempenho e segurança.

# **Como funciona?**

O sistema permite que os responsáveis cadastrem informações importantes de
seus dependentes em um aplicativo, que são então transferidas para uma
pulseira via chip NFC quando esta é aproximada do celular com o aplicativo
aberto na página correta. A pulseira é colocada no braço do dependente e, se ele
estiver perdido, alguém pode ler o NFC da pulseira com um celular para acessar
uma página web com os dados do dependente e um número de emergência. Se
não houver acesso à internet, o aplicativo pode ler o NFC.

Ao acessar a página web, o usuário terá acesso apenas ao nome do dependente
e ao telefone do responsável para contato. Caso deseje visualizar informações
mais sensíveis, será necessário que o usuário se identifique, fornecendo detalhes
pessoais como nome e telefone. Após a inserção desses dados em nosso
sistema, um SMS será enviado para o celular registrado, e o usuário só poderá
avançar na página ao inserir o código SMS correto no campo designado. Se o
código for inserido corretamente, a localização do indivíduo será registrada em
nosso sistema, assegurando a segurança do dependente e proporcionando
auxílio aos responsáveis em situações de emergência.
