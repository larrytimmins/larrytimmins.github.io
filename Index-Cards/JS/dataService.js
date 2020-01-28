/*A service that provides an array of vocabulary terms and definitions to the controller */
myApp.factory('Data',  function () {
    
    //test array containing vocabulary words as terms and definitions as correctAnswer
    var basicModel = [
        {"term":"", "correctAnswer":""}, 
        {"term":"", "correctAnswer":""},
		{"term":"", "correctAnswer":""},
        {"term":"", "correctAnswer":""}, 
        {"term":"", "correctAnswer":""},
		{"term":"", "correctAnswer":""},
        {"term":"", "correctAnswer":""}, 
        {"term":"", "correctAnswer":""},
		{"term":"", "correctAnswer":""},		
    ];
	
   var science1 = [

        {"term":"Energy stored in the arrangement of particles of matter", "correctAnswer":"Chemical Energy"},

        {"term":"A path that electricity follows", "correctAnswer":"Circuit"},

        {"term":"Materials that allow electric charge to flow through them easily", "correctAnswer":"Conductors"},

        {"term":"A steady movement of charges through certain materials", "correctAnswer":"Electric Current"},

        {"term":"A temporary magnet caused by an electrical current", "correctAnswer":"Electromagnet"},

        {"term":"A material that does not carry current electricity well", "correctAnswer":"Insulator"},

        {"term":"A device that produces an electric current", "correctAnswer":"Generator"},

        {"term":"Energy of motion", "correctAnswer":"Kinetic energy"},

        {"term":"An object that attracts iron, steal, and a few other (but not all) metals", "correctAnswer":"Magnet"},

        {"term":"The parts of a magnet at which its force is strongest", "correctAnswer":"Magnetic poles"},

        {"term":"Energy that moves a machine", "correctAnswer":"Mechanical energy"},

        {"term":"A circuit that has more than one path for an electric current to follow", "correctAnswer":"Parallel Circuit"},     

        {"term":"Energy that an object has because of its position or its condition", "correctAnswer":"Potential Energy"},

        {"term":"A circuit that has only one path for an electric current to follow", "correctAnswer":"Series Circuit"}

    ];

    // Larry Timmins https://github.com/larrytimmins
    // 1-25-2020 LJT modified jcsmileyjr Index Card to add kube01 
    // 1-25-2020 LJT next: test if logic find it before deleted science1 - which I got 100% first try LOL
    var kube01 = [

        {"term":"A basic unity of scheduling for visualization", "correctAnswer":"virtual machine"},

        {"term":"The unit of scheduling used by Kubernetes", "correctAnswer":"Pod"},

        {"term":"The command line utility used to access the Kubernetes API is known as", "correctAnswer":"kubectl"},

        {"term":"What is used to get a minimum viable cluster up and running", "correctAnswer":"kubeadm"},

        {"term":"This group of containers are co-located, share resources (like storage, Linux namespaces, cgroups, IP addresses) and are always scheduled together", "correctAnswer":"Pod"},

        {"term":"What are intended to be short-lived.  They are created, destroyed and re-created on demand, based on state of the service and the server itself", "correctAnswer":"Pod"},

        {"term":"What is an abstraction on top of a number of pods, where you configure load balancing and typically requiring to run a proxy on top", "correctAnswer":"Service"},

        {"term":"What does a service provide for other services to communicate with it", "correctAnswer":"Virtual IP address"},

        {"term":"A processing unit that combines an API server, controller-managers, scheduler and etcd key value store is called", "correctAnswer":"Master Node"},

        {"term":"A processing unit made up of kubelet, kube-proxy, containerization engine and pods of containers", "correctAnswer":"Worker node"},

        {"term":"What is responsible for the management of a Kubernetes cluster", "correctAnswer":"Master node"},

        {"term":"What does Kubernetes use to handle the orchestration of all worker nodes", "correctAnswer":"Master Node"},

        {"term":"Where do the actual services needed by application run in Kubernetes", "correctAnswer":"Worker nodes"},

        {"term":"What is the Kubernetes entry point for all commands used to control the cluster", "correctAnswer":"API server"},

        {"term":"What processes REST requests, validates them and executes the bound business logic", "correctAnswer":"API server"},

        {"term":"What is a simple, distributed, consistent key-value store", "correctAnswer":"etcd storage"},

        {"term":"The etcd key-value store location is", "correctAnswer":"Master node"},

        {"term":"What provides a REST API for CRUD operations", "correctAnswer":"etcd store"},

        {"term":"How does Kubernetes notify the rest of a cluster about configuration changes", "correctAnswer":"register watchers"},

        {"term":"What is used for shared configuration and service discovery in Kubernetes", "correctAnswer":"etcd storage"},

        {"term":"Where does Kubernetes store data from jobs scheduled, created and deployed", "correctAnswer":"etcd"},

        {"term":"What Kubernetes component handles deployment of configured pods and servers onto the worker nodes", "correctAnswer":"Scheduler"},

        {"term":"What decides where to deploy a specific service", "correctAnswer":"Scheduler"},

        {"term":"Information of what's available on the members of the cluster, as well as the ones required for configured service to run", "correctAnswer":"Resources"},

        {"term":"What does a controller use to watch the shared state of the cluster", "correctAnswer":"API Server"},

        {"term":"What is used to make corrective changes to the current state to change it to the desired one", "correctAnswer":"Controller"},

        {"term":"What takes care of the number of pods in the system", "correctAnswer":"Replication controller"},

        {"term":"What recreates a failed pod or removes an extra-scheduled pod when needed", "correctAnswer":"Replication controller"},

        {"term":"What determines whether a replication controller re-creates or removes pods", "correctAnswer":"replication factor"},

        {"term":"Where does a Kubernetes run Pods", "correctAnswer":"Worker Nodes"},

        {"term":"what manages inter-container networks, communicates with master node and assigns resources to the containers scheduled", "correctAnswer":"Worker Nodes"},

        {"term":"What runs the configured pods in Kubernetes", "correctAnswer":"Docker"},

        {"term":"What runs the configured pods in Kubernetes", "correctAnswer":"rkt"},

        {"term":"What runs the configured pods in Kubernetes", "correctAnswer":"Container orchestration engine"},

        {"term":"what gets pod configurations and ensures the described containers are up and running", "correctAnswer":"kubelet"},

        {"term":"What worker node service is responsible for communications with the master node", "correctAnswer":"kubelet"},

        {"term":"what takes care of downloading the images described and starting the containers for each pod", "correctAnswer":"Docker"},

        {"term":"what takes care of downloading the images described and starting the containers for each pod", "correctAnswer":"rkt"},

        {"term":"what takes care of downloading the images described and starting the containers for each pod", "correctAnswer":"container orchestration engine"},

        {"term":"Where can kubelet get information about services and write details about newly created ones, "correctAnswer":"etcd"},

        {"term":"Where does kubelet get the configuration of a pod from", "correctAnswer":"Api server"},

        {"term":"What takes care of network routing for TCP and UDP packets on a worker node", "correctAnswer":"kube-proxy"},

        {"term":"what command line tool communicates with the API service and sends commands to the master node", "correctAnswer":"kubectl"},

        {"term":"What from Kubernetes can run all Kubernetes components inside a single docker container for educational purposes only", "correctAnswer":"hyperkube"}


    ];    
	
return {      
    
            //return requested test
            getData: function(test){
                //if(test = MSChp6)
                  //  return MSChp6;
                switch(test){

                    case "science1":

                        return science1;

                    case "kube01":
    
                        return kube01;
                }
                
            }
    
        }//end of the return
});